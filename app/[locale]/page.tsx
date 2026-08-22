

import HeroContent from "@/components/shared/Hero/HeroContent";
import HeroImage from "@/components/shared/Hero/HeroImage";
import SocialLinks from "@/components/shared/Hero/SocialLinks";
import MyIcon from "@/components/shared/Icon/MyIcons";
import { Email, GithubIcon, LinkedinIcon, TelegramIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

type Props = {
  params: Promise<{ locale: string }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "metadata.home",
  });

  const baseUrl = 'https://mahdijeddi.ir'
  const url = `${baseUrl}/${locale}`;
  const ogImageUrl = `${baseUrl}/og-en.png`

  return {
    title: {
      absolute: t('title')
    },
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en`,
        fa: `${baseUrl}/fa`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: t('openGraphSiteName'),
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("openGraphImageAlt"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImageUrl],
    },
  };
}

async function HomePage({ params }: Props) {

  const { locale } = await params
  //  -- UI
  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mahdijeddidev/", icon: <MyIcon icon={LinkedinIcon} size={24} /> },
    { name: "GitHub", href: "https://github.com/mahdijeddidev", icon: <MyIcon icon={GithubIcon} size={24} /> },
    { name: "Telegram", href: "https://t.me/mahdijeddidev", icon: <MyIcon icon={TelegramIcon} size={24} /> },
    { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=mahdijeddidev@gmail.com", icon: <MyIcon icon={Email} size={24} /> },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center lg:h-[calc(100vh-4rem)] py-8 lg:py-0 overflow-hidden">

      {/* Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Main Grid Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center justify-items-center">

        {/* Visual Side */}
        <HeroImage src="/photo-me.png" alt="Mahdi Jeddi, Frontend Developer specializing in React and Next.js" />

        {/* Text and Actions Side */}
        <HeroContent locale={locale}>
          <SocialLinks links={socials} />
        </HeroContent>

      </div>
    </section>
  );
}

export default HomePage
