import { getSession } from "next-auth/react";
import {
    ProgramData,
    InvestorDaftarData,
    TeamMemberData,
    PitchData,
    FounderProfileData,
    InvestorProfileData,
    PitchVideoData,
    PitchReviewData,
    CollaborationData,
    DeleteRequestData,
    QuestionListData,
    QuestionData,
    FAQData,
} from "./api-types";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiClientOptions {
    method?: RequestMethod;
    body?: any;
    params?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: ApiClientOptions = {}) {
    const session = await getSession();
    const token = session?.accessToken;

    const { method = 'GET', body, params } = options;

    // Get the session token
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

    // Add query parameters if they exist
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Only add Authorization header if we have a token
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers,
        credentials: 'include',
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), config);

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
}

// API endpoints based on Insomnia export
export const api = {
    // Collaboration Endpoints
    collaboration: {
        getRequests: (daftarId: string) =>
            apiClient('/daftar-collab/collabs/', { params: { daftar_id: daftarId } }),
        actionOnRequest: (id: string, action: 'accepted' | 'rejected') =>
            apiClient(`/daftar-collab/collabs/${id}/action/`, { method: 'POST', body: { action } }),
        deleteRequest: (id: string) =>
            apiClient(`/daftar-collab/collabs/${id}/`, { method: 'DELETE' }),
        create: (data: CollaborationData) =>
            apiClient('/daftar-collab/collabs/', { method: 'POST', body: data }),
    },

    // Delete Management
    deleteManagement: {
        approveDaftarDelete: (daftarDeleteId: string) =>
            apiClient(`/daftar-delete/daftar/delete/approve/${daftarDeleteId}/`, { method: 'POST' }),
        requestDaftarDelete: (data: DeleteRequestData) =>
            apiClient('/daftar-delete/daftar/delete/', { method: 'POST', body: data }),
        approveProgramDelete: (programDeleteId: string) =>
            apiClient(`/daftar-delete/program/delete/approve/${programDeleteId}/`, { method: 'POST' }),
        requestProgramDelete: (data: DeleteRequestData) =>
            apiClient('/daftar-delete/program/delete/', { method: 'POST', body: data }),
    },

    // Pitch Review
    pitchReview: {
        delete: (id: string) =>
            apiClient(`/pitch-review/pitch-reviews/${id}/`, { method: 'DELETE' }),
        update: (id: string, data: PitchReviewData) =>
            apiClient(`/pitch-review/pitch-reviews/${id}/`, { method: 'PUT', body: data }),
        getAll: (pitchId: string) =>
            apiClient(`/pitch-review/pitch-reviews/${pitchId}/`),
        create: (data: PitchReviewData) =>
            apiClient('/pitch-review/pitch-reviews/', { method: 'POST', body: data }),
    },

    // Investor Program
    investorProgram: {
        getQuestions: (questionListId: string) =>
            apiClient(`/investor-program/questions/${questionListId}/`),
        createQuestionList: (data: QuestionListData) =>
            apiClient('/investor-program/questions-list/', { method: 'POST', body: data }),
        createQuestion: (data: QuestionData) =>
            apiClient('/investor-program/questions/', { method: 'POST', body: data }),
        getFAQs: (programId: string) =>
            apiClient(`/investor-program/faqs/${programId}/`),
        getQuestionList: (programId: string) =>
            apiClient(`/investor-program/questions-list/${programId}/`),
        createFAQ: (data: FAQData) =>
            apiClient('/investor-program/faqs/', { method: 'POST', body: data }),
        createProgram: (data: ProgramData) =>
            apiClient('/investor-program/programs/', { method: 'POST', body: data }),
        getAllPrograms: () =>
            apiClient('/investor-program/programs/'),
    },

    // Investor Team
    investorTeam: {
        handleInvitation: (data: { token: string, action: 'accept' | 'reject' }) =>
            apiClient('/investor-team/accept-reject-invitation/', { method: 'POST', body: data }),
        deleteTeamMember: (daftarId: string, teamMemberId: string) =>
            apiClient(`/investor-team/team-members/${daftarId}/${teamMemberId}/`, { method: 'DELETE' }),
        updateTeamMember: (daftarId: string, teamMemberId: string, data: TeamMemberData) =>
            apiClient(`/investor-team/team-members/${daftarId}/${teamMemberId}/`, { method: 'PUT', body: data }),
        addTeamMember: (data: TeamMemberData) =>
            apiClient('/investor-team/team-members/', { method: 'POST', body: data }),
        getTeamMembers: (daftarId: string) =>
            apiClient(`/investor-team/team-members/${daftarId}/`),
    },

    // Investor Daftar
    investorDaftar: {
        delete: (daftarId: string) =>
            apiClient('/investor-daftar/investor-daftar/', {
                method: 'DELETE',
                params: { daftar_id: daftarId }
            }),
        update: (daftarId: string, data: InvestorDaftarData) =>
            apiClient('/investor-daftar/investor-daftar/', {
                method: 'PUT',
                params: { daftar_id: daftarId },
                body: data
            }),
        partialUpdate: (daftarId: string, data: Partial<InvestorDaftarData>) =>
            apiClient('/investor-daftar/investor-daftar/', {
                method: 'PATCH',
                params: { daftar_id: daftarId },
                body: data
            }),
        create: (data: InvestorDaftarData) =>
            apiClient('/investor-daftar/investor-daftar/', { method: 'POST', body: data }),
        getAll: () =>
            apiClient('/investor-daftar/investor-daftar/'),
    },

    // Founder Profile
    founderProfile: {
        delete: () =>
            apiClient('/founder-profile/complete-profile/', { method: 'DELETE' }),
        partialUpdate: (data: Partial<FounderProfileData>) =>
            apiClient('/founder-profile/complete-profile/', { method: 'PATCH', body: data }),
        get: () =>
            apiClient('/founder-profile/complete-profile/'),
        update: (data: FounderProfileData) =>
            apiClient('/founder-profile/complete-profile/', { method: 'PUT', body: data }),
    },

    // Founder Team
    founderTeam: {
        rejectInvitation: (data: { token: string, action: 'reject' }) =>
            apiClient('/founder-team/accept_invitation/', { method: 'POST', body: data }),
        acceptInvitation: (data: { token: string, action: 'accept' }) =>
            apiClient('/founder-team/accept_invitation/', { method: 'POST', body: data }),
        inviteTeamMember: (data: { pitch_id: number, first_name: string, last_name: string, designation: string, email: string }) =>
            apiClient('/founder-team/invite_team_member/', { method: 'POST', body: data }),
    },

    // Founder Pitch
    founderPitch: {
        teamMemberResponse: (data: { pitch_id: string, action: string, response: string }) =>
            apiClient('/founder-pitch/pitches/manage/', { method: 'PUT', body: data }),
        deleteOrWithdraw: (data: { pitch_id: string, action: 'delete' | 'withdraw' }) =>
            apiClient('/founder-pitch/pitches/manage/', { method: 'POST', body: data }),
        getSpecific: (pitchId: string) =>
            apiClient(`/founder-pitch/pitches/${pitchId}/`),
        getAll: () =>
            apiClient('/founder-pitch/pitches/'),
        create: (data: PitchData) =>
            apiClient('/founder-pitch/pitches/', { method: 'POST', body: data }),
    },

    // Pitch Video
    pitchVideo: {
        upload: (pitchId: string, data: PitchVideoData) =>
            apiClient(`/pitch-video/upload/${pitchId}/`, { method: 'POST', body: data }),
        getByQuestion: (pitchId: string, questionNumber: string) =>
            apiClient(`/pitch-video/videos/${questionNumber}/?pitch_id=${pitchId}`),
        getAll: (pitchId: string) =>
            apiClient('/pitch-video/videos/', { params: { pitch_id: pitchId } }),
    },

    // Pitch Document
    pitchDocument: {
        delete: (documentId: string) =>
            apiClient(`/documents/${documentId}/`, { method: 'DELETE' }),
        update: (documentId: string, data: FormData) =>
            apiClient(`/documents/${documentId}/`, { method: 'PUT', body: data }),
        upload: (data: FormData) =>
            apiClient('/pitch-document/documents/', { method: 'POST', body: data }),
        list: (pitchId: string) =>
            apiClient('/documents/', { params: { pitch_id: pitchId } }),
    },

    // Investor Profile
    investorProfile: {
        get: () =>
            apiClient('/investor-profile/investor-profile/'),
        reactivate: () =>
            apiClient('/investor-profile/investor-profile/', { method: 'PATCH' }),
        deactivate: () =>
            apiClient('/investor-profile/investor-profile/', { method: 'DELETE' }),
        update: (data: InvestorProfileData) =>
            apiClient('/investor-profile/investor-profile/', { method: 'PUT', body: data }),
    },
}; 