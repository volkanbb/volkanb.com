import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'TR' | 'EN';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private currentLang = signal<Language>('TR');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang && (savedLang === 'TR' || savedLang === 'EN')) {
        this.currentLang.set(savedLang);
      }
    }
  }

  lang = this.currentLang.asReadonly();
// ... translations omitted for brevity in replace_file_content targetContent but included in replacement ...

  translations = {
    TR: {
      nav: {
        home: 'Ana Sayfa',
        restaurants: 'Restoranlarımız',
        story: 'Hikayemiz',
        burger: 'Burger Craft',
        steak: 'Prime Steakhouse',
        pizza: 'Pizza Napoli',
        language: 'Dil',
      },
      hero: {
        tag: 'OTANTİK LEZZETLER',
        title: 'Vantage Table',
        subtitle: 'Modern lezzetlerin geleneksel dokunuşlarla buluştuğu nokta.',
        location: 'New York, NY',
        reviews: '4.9 (2bin+ Yorum)',
      },
      about: {
        title: 'Gastronomi Tutkusuyla Geçen On Yıllar',
        p1: 'Culinary Craft Grubu, modern mutfak sanatlarını yerel dokunuşlarla harmanlayarak misafirlerine unutulmaz deneyimler sunmak amacıyla kuruldu. Portföyümüzde yer alan her bir marka, kendine özgü karakteri ve kalite anlayışıyla gastronomi dünyasında fark yaratmaktadır.',
        p2: 'Sadece yemek sunmuyoruz; her bir restoranımızda misafirperverlik, estetik ve lezzetin mükemmel uyumunu sergiliyoruz. Vantage Table\'dan Pizza Napoli\'ye kadar her durağımızda aynı özeni bulacaksınız.',
        cta: 'Markalarımızı Keşfedin',
      },
      ambiance: {
        title: 'Eşsiz Atmosferimiz'
      },
      contact: {
        title: 'İletişime Geçin',
        desc: 'Culinary Craft Hospitality Group ile ilgili sorularınız, iş ortaklıkları veya genel bilgi için bize ulaşın.',
        addressTitle: 'Merkez Ofis',
        address: 'Little Italy, New York, NY 10013',
        phoneTitle: 'Telefon',
        phone: '+1 (212) 555-0123',
        emailTitle: 'E-posta',
        email: 'hello@culinarycraft.com'
      },
      footer: {
        allRights: 'Tüm hakları saklıdır.',
        policy: 'Gizlilik Politikası',
        terms: 'Hizmet Şartları',
        accessibility: 'Erişilebilirlik',
        press: 'Basın Kiti'
      },
      franchise: {
        title: 'Bayilik (Franchise) Başvurusu',
        desc: 'Culinary Craft ailesine katılın. Başarılı iş modelimiz ve marka gücümüzle kendi restoranınızı açın.',
        benefit1: 'Kanıtlanmış İş Modeli',
        benefit2: 'Eğitim ve Destek',
        benefit3: 'Global Marka Bilinirliği',
        contact: 'İletişim için:'
      },
      restaurants: {
        title: 'Seçkin Restoranlarımız',
        subtitle: 'Her biri kendine özgü bir hikaye ve eşsiz lezzetler sunan markalarımızı keşfedin.'
      }
    },
    EN: {
      nav: {
        home: 'Home',
        restaurants: 'Restaurants',
        story: 'Our Story',
        burger: 'Burger Craft',
        steak: 'Prime Steakhouse',
        pizza: 'Pizza Napoli',
        language: 'Language',
      },
      hero: {
        tag: 'AUTHENTIC FLAVORS',
        title: 'Vantage Table',
        subtitle: 'Where modern culinary arts meet traditional touches.',
        location: 'New York, NY',
        reviews: '4.9 (2k+ Reviews)',
      },
      about: {
        title: 'Decades of Passion for Gastronomy',
        p1: 'The Culinary Craft Group was founded to provide guests with unforgettable experiences by blending modern culinary arts with local touches. Each brand in our portfolio makes a difference in the gastronomy world with its unique character and understanding of quality.',
        p2: 'We don\'t just serve food; we showcase the perfect harmony of hospitality, aesthetics, and flavor in each of our restaurants. You will find the same care at every stop, from Vantage Table to Pizza Napoli.',
        cta: 'Discover Our Brands',
      },
      ambiance: {
        title: 'Our Unique Ambiance'
      },
      contact: {
        title: 'Get in Touch',
        desc: 'Contact us for inquiries regarding Culinary Craft Hospitality Group, partnerships, or general information.',
        addressTitle: 'Headquarters',
        address: 'Little Italy, New York, NY 10013',
        phoneTitle: 'Phone',
        phone: '+1 (212) 555-0123',
        emailTitle: 'Email',
        email: 'hello@culinarycraft.com'
      },
      footer: {
        allRights: 'All rights reserved.',
        policy: 'Privacy Policy',
        terms: 'Terms of Service',
        accessibility: 'Accessibility',
        press: 'Press Kit'
      },
      franchise: {
        title: 'Franchise Application',
        desc: 'Join the Culinary Craft family. Start your own restaurant with our successful business model and brand power.',
        benefit1: 'Proven Business Model',
        benefit2: 'Training & Support',
        benefit3: 'Global Brand Recognition',
        contact: 'Contact us at:'
      },
      restaurants: {
        title: 'Our Elite Restaurants',
        subtitle: 'Explore our brands, each offering a unique story and exceptional flavors.'
      }
    }
  };

  t = computed(() => this.translations[this.currentLang()]);

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang() === 'TR' ? 'EN' : 'TR');
  }
}
