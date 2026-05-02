import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SeoIssue {
  type: string;
  message: string;
  category: string;
}

export interface SeoAnalysisResult {
  url: string;
  score: number;
  technicalScore: number;
  contentScore: number;
  performanceScore: number;
  title: string | null;
  titleLength: number;
  hasMetaDescription: boolean;
  wordCount: number;
  h1H6Structure: string;
  imagesWithoutAltCount: number;
  httpStatusCode: number;
  isHttps: boolean;
  pageLoadTimeMs: number;
  hasMobileViewport: boolean;
  hasRobotsTxt: boolean;
  hasSitemapXml: boolean;
  internalLinksChecked: string[];
  issues: SeoIssue[];
  timestamp?: number; // for session history
}

export interface SeoAnalysisError {
  status: number;
  message: string;
  nextAllowedTime?: string;
  remainingSeconds?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeoAnalysisService {
  private apiUrl = `${environment.apiUrl}/Seo`;

  constructor(private http: HttpClient) {}

  analyzeUrl(url: string): Observable<SeoAnalysisResult> {
    return this.http.post<SeoAnalysisResult>(`${this.apiUrl}/analyze`, { url })
      .pipe(
        catchError(this.handleError)
      );
  }

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errRes: SeoAnalysisError = {
      status: error.status,
      message: 'Bilinmeyen bir hata oluştu.'
    };

    if (error.error && error.error.message) {
      errRes.message = error.error.message;
      errRes.nextAllowedTime = error.error.nextAllowedTime;
      errRes.remainingSeconds = error.error.remainingSeconds;
    } else if (error.status === 429) {
       errRes.message = 'Günlük sorgu limitinize ulaştınız.';
    }

    return throwError(() => errRes);
  }

  // Session storage for history
  saveToHistory(result: SeoAnalysisResult) {
    result.timestamp = Date.now();
    const history = this.getHistory();
    history.unshift(result);
    // Keep max 10
    if(history.length > 10) history.pop();
    sessionStorage.setItem('seo_history', JSON.stringify(history));
  }

  getHistory(): SeoAnalysisResult[] {
    const data = sessionStorage.getItem('seo_history');
    return data ? JSON.parse(data) : [];
  }
}
