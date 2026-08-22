import ContactStructuredData from "@/components/SEO/ContactStructuredData";
import AvailabilityPanel from "@/components/shared/Contact/AvailabilityPanel";
import ContactCard from "@/components/shared/Contact/ContactCard";
import HandMarker from "@/components/shared/Text/HandMarker";
import { CallIcon, Email, GithubIcon, LinkedinIcon, TelegramIcon } from "@hugeicons/core-free-icons";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.contact" });

    const baseUrl = 'https://mahdijeddi.ir'
    const url = `${baseUrl}/${locale}/contact-me`;

    const ogImageUrl = `${baseUrl}/og-en.png`

    return {
        title: t('title'),
        description: t("description"),
        alternates: {
            canonical: url,
            languages: {
                en: `${baseUrl}/en/contact-me`,
                fa: `${baseUrl}/fa/contact-me`,
                "x-default": `${baseUrl}/en/contact-me`,
            }
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url,
            siteName: "Mahdi Jeddi",
            type: "profile",
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

async function ContactMePage({ params }: Props) {

    const { locale } = await params
    const t = await getTranslations({
        locale,
        namespace: "ContactPage",
    });

    // Interactive Channels Setup
    const phone = "+98 922 507 4085";
    const email = "mahdijeddidev@gmail.com";
    const communicationChannels = [
        {
            title: t("phoneTitle"),
            value: phone,
            href: "tel:+989225074085",
            icon: CallIcon,
            badgeText: t("fastestBadge"),
        },
        {
            title: t("emailTitle"),
            value: email,
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=mahdijeddidev@gmail.com",
            icon: Email,
            // badgeText: t("fastestBadge"),
        },
        {
            title: t("telegramTitle"),
            value: "@mahdijeddidev",
            href: "https://t.me/mahdijeddidev",
            icon: TelegramIcon,
            badgeText: t("fastestBadge"),
        },
        {
            title: t("linkedinTitle"),
            value: "Mahdi Jeddi",
            href: "https://www.linkedin.com/in/mahdijeddidev/",
            icon: LinkedinIcon,
            badgeText: t("fastestBadge"),
        },

        {
            title: t("githubTitle"),
            value: "mahdijeddidev",
            href: "https://github.com/mahdijeddidev",
            icon: GithubIcon,
        },
    ];

    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center lg:h-[calc(100vh-4rem)] py-8 lg:py-0 overflow-hidden">

            <ContactStructuredData email={email} phone={phone} locale={locale} />

            {/* Background Decorative Radial Mask */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl -z-10 pointer-events-none" />

            {/* Main Framework Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center justify-items-center">

                {/* Left Side Status Context */}
                <AvailabilityPanel
                    badge={t("badge")}
                    title={t("title")}
                    subtitle={t.rich("subtitle", {
                        marker: (chunks) => <HandMarker>{chunks}</HandMarker>
                    })}
                    statusText={t("statusActive")}
                    timezoneLabel={t("timezoneLabel")}
                />

                {/* Right Side Matrix Grid */}
                <div className="w-full max-w-md flex flex-col gap-3.5">
                    {communicationChannels.map((channel, idx) => (
                        <ContactCard
                            key={channel.href}
                            title={channel.title}
                            value={channel.value}
                            href={channel.href}
                            icon={channel.icon}
                            badgeText={channel.badgeText}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default ContactMePage
