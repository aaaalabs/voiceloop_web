import { redirect } from 'next/navigation';
import { SurveyPage } from "@/components/survey/survey-page";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import {
  getTestimonials,
  getCurrentKpis,
  type Testimonial,
  type MvCurrentKpis,
  getLatestBlogPost,
} from "@/db";

interface SurveyPageProps {
  currentKpis: MvCurrentKpis | null;
  testimonials: Testimonial[];
}

export default async function ImpactSurvey({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { name, id } = searchParams;
    
    // Redirect if required parameters are missing
    if (!name || !id) {
        redirect('/');
    }

    const [testimonials, currentKpis] = await Promise.all([
        (await getTestimonials()).map(t => ({ ...t, id: crypto.randomUUID() })),
        getCurrentKpis(),
    ]);
    
    return (
        <SurveyPage 
            currentKpis={currentKpis} 
            testimonials={testimonials}
            userName={name as string}
            userId={id as string}
        />
    );
} 


