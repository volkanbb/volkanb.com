import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [ngClass]="['btn', variant, size]" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-sans);
      font-weight: 500;
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      outline: none;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Variants */
    .primary {
      background-color: var(--primary-color);
      color: white;
      box-shadow: var(--shadow-sm);
    }
    .primary:hover:not(:disabled) {
      background-color: var(--primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .outline {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
    .outline:hover:not(:disabled) {
      background-color: rgba(79, 70, 229, 0.05);
    }

    /* Sizes */
    .sm { padding: 0.375rem 0.75rem; font-size: 0.875rem; }
    .md { padding: 0.5rem 1rem; font-size: 1rem; }
    .lg { padding: 0.75rem 1.5rem; font-size: 1.125rem; }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'text' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
}
