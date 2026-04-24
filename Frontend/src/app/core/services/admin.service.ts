import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSiteContent(sectionName: string) {
    return this.http.get<any>(`${this.apiUrl}/SiteContent/${sectionName}`);
  }

  updateSiteContent(id: number, content: any) {
    return this.http.put<any>(`${this.apiUrl}/SiteContent/${id}`, content);
  }

  upsertSiteContent(sectionName: string, content: any) {
    return this.http.post<any>(`${this.apiUrl}/SiteContent/upsert/${sectionName}`, content);
  }

  uploadMedia(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/Media/Upload`, formData);
  }

  // Demo Projects
  getDemoProjects() {
    return this.http.get<any[]>(`${this.apiUrl}/DemoProject`);
  }

  createDemoProject(project: any) {
    return this.http.post<any>(`${this.apiUrl}/DemoProject`, project);
  }

  updateDemoProject(id: number, project: any) {
    return this.http.put<any>(`${this.apiUrl}/DemoProject/${id}`, project);
  }

  deleteDemoProject(id: number) {
    return this.http.delete(`${this.apiUrl}/DemoProject/${id}`);
  }

  getBlogPosts() {
    return this.http.get<any[]>(`${this.apiUrl}/Blog`);
  }

  getBlogPost(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Blog/${id}`);
  }

  createBlogPost(post: any) {
    return this.http.post<any>(`${this.apiUrl}/Blog`, post);
  }

  updateBlogPost(id: number, post: any) {
    return this.http.put<any>(`${this.apiUrl}/Blog/${id}`, post);
  }

  deleteBlogPost(id: number) {
    return this.http.delete(`${this.apiUrl}/Blog/${id}`);
  }

  // Notifications (Contact Messages)
  getNotifications() {
    return this.http.get<any[]>(`${this.apiUrl}/Contact`);
  }

  markAsRead(id: number) {
    return this.http.put(`${this.apiUrl}/Contact/${id}/read`, {});
  }

  deleteNotification(id: number) {
    return this.http.delete(`${this.apiUrl}/Contact/${id}`);
  }

  sendContactMessage(message: any) {
    return this.http.post<any>(`${this.apiUrl}/Contact`, message);
  }

  // Portfolio Services
  getPortfolioServices() {
    return this.http.get<any[]>(`${this.apiUrl}/PortfolioService`);
  }

  createPortfolioService(service: any) {
    return this.http.post<any>(`${this.apiUrl}/PortfolioService`, service);
  }

  updatePortfolioService(id: number, service: any) {
    return this.http.put(`${this.apiUrl}/PortfolioService/${id}`, service);
  }

  deletePortfolioService(id: number) {
    return this.http.delete(`${this.apiUrl}/PortfolioService/${id}`);
  }

  // Social Media Management
  getSocialMedias() {
    return this.http.get<any[]>(`${this.apiUrl}/SocialMedia`);
  }

  createSocialMedia(social: any) {
    return this.http.post<any>(`${this.apiUrl}/SocialMedia`, social);
  }

  updateSocialMedia(id: number, social: any) {
    return this.http.put(`${this.apiUrl}/SocialMedia/${id}`, social);
  }

  deleteSocialMedia(id: number) {
    return this.http.delete(`${this.apiUrl}/SocialMedia/${id}`);
  }
}
