import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 w-full mt-24">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-8 max-w-7xl mx-auto font-serif text-sm tracking-wide">
        <div class="font-serif italic text-xl text-orange-900 dark:text-orange-100">Culinary Craft</div>
        <div class="flex flex-wrap justify-center gap-8 text-stone-500 dark:text-stone-400">
          <a class="hover:text-orange-800 dark:hover:text-orange-300 underline-offset-4 hover:underline" href="#">{{ ls.t().footer.policy }}</a>
          <a class="hover:text-orange-800 dark:hover:text-orange-300 underline-offset-4 hover:underline" href="#">{{ ls.t().footer.terms }}</a>
          <a class="hover:text-orange-800 dark:hover:text-orange-300 underline-offset-4 hover:underline" href="#">{{ ls.t().footer.accessibility }}</a>
          <a class="hover:text-orange-800 dark:hover:text-orange-300 underline-offset-4 hover:underline" href="#">{{ ls.t().footer.press }}</a>
        </div>
        <div class="text-orange-950 dark:text-stone-100 opacity-90">© {{ currentYear }} Culinary Craft Hospitality Group. {{ ls.t().footer.allRights }}</div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  ls = inject(LanguageService);
  currentYear = new Date().getFullYear();
}
