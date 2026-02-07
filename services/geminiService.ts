import { User, Event, ParticipationRecord } from '../types';

interface ImportMetaEnv {
  VITE_GEMINI_API_KEY?: string;
}

declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

/**
 * ParticipationIntelligence provides AI-powered insights into student participation patterns
 * using the Google Gemini API.
 */
export class ParticipationIntelligence {
  private apiKey: string;

  constructor() {
    // Get the API key from environment variables
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  /**
   * Analyzes a student's engagement journey across events
   * @param student The student user
   * @param events All available events
   * @param records All participation records
   * @returns A narrative insight about the student's journey
   */
  async analyzeStudentJourney(
    student: User,
    events: Event[],
    records: ParticipationRecord[]
  ): Promise<string | null> {
    try {
      // Get the student's participation records
      const studentRecords = records.filter(r => r.studentId === student.id);
      
      // Get the events the student participated in
      const attendedEvents = studentRecords
        .filter(r => r.eventId)
        .map(r => events.find(e => e.id === r.eventId))
        .filter(Boolean) as Event[];

      // Build a prompt for Gemini
      const prompt = this.buildAnalysisPrompt(student, attendedEvents, studentRecords);

      // Call Gemini API (placeholder - implement with actual API call)
      const insight = await this.callGeminiAPI(prompt);
      
      return insight;
    } catch (error) {
      console.error('Error analyzing student journey:', error);
      return null;
    }
  }

  /**
   * Builds a prompt for the Gemini API
   */
  private buildAnalysisPrompt(
    student: User,
    events: Event[],
    records: ParticipationRecord[]
  ): string {
    const eventTitles = events.map(e => e.title).join(', ');
    const certificateCount = records.filter(r => r.status === 'Certified').length;

    return `Provide a brief, inspiring narrative (2-3 sentences) about the academic journey of ${student.name}, 
a ${student.department} student who has participated in the following events: ${eventTitles || 'none yet'}. 
They have earned ${certificateCount} verified credentials. 
Focus on their growth and contributions to the campus community.`;
  }

  /**
   * Calls the Gemini API with the prompt
   * Note: This is a placeholder implementation
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    // TODO: Implement actual Gemini API call
    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `${prompt.slice(0, 50)}... This is a placeholder response. Implement actual Gemini API integration in environment variables.`
        );
      }, 1000);
    });
  }
}
