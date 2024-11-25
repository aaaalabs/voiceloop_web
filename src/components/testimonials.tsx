import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { cn } from "@/lib/utils";
import { InViewDiv } from "./in-view-div";
import { useMemo } from "react";
import { TestimonialColumnContainer } from "./testimonial-column-container";
import Image from "next/image";
import { type Testimonial } from "@/db";
import AvatarCircle from "@p/AvatarCircle.png";
import { getOptimizedImageUrl } from "@/utils/imageKit";

interface AvatarProps {
  image_url: string | null;
  logo_url?: string | null;
  name: string | null;
}

function ConditionalAvatar({ image_url, logo_url, name }: AvatarProps) {
  if (logo_url) {
    return (
      <div className="relative flex items-center">
        <Image
          src={getOptimizedImageUrl(logo_url, 50)}
          width={48}
          height={48}
          className="rounded-full bg-[rgb(var(--background-tertiary))] border border-black"
          alt="Company logo"
        />
        <Image
          src={getOptimizedImageUrl(image_url ?? AvatarCircle.src, 50)}
          width={48}
          height={48}
          className="rounded-full border-2 border-[rgb(var(--background-tertiary))] dark:border-neutral-900 -ml-4 ring-1 ring-black"
          alt={name ?? "Profile picture"}
        />
      </div>
    );
  } else {
    return (
      <Image
        src={getOptimizedImageUrl(image_url ?? AvatarCircle.src, 50)}
        width={48}
        height={48}
        className="rounded-full border border-black"
        alt={name ?? "Profile picture"}
      />
    );
  }
}

export const Testimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return (
    <div className="relative z-20 pb-10 md:pb-40" id="testimonials">
      <TestimonialGrid testimonials={testimonials} />
    </div>
  );
};

function Testimonial({
  name,
  content,
  image_url,
  career_stage,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"figure">, keyof Testimonial> &
  Testimonial) {
  const animationDelay = useMemo(() => {
    const possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={cn(
        "animate-fade-in rounded-3xl bg-[rgb(var(--background-tertiary))] dark:bg-[#3D4F4F] p-8 opacity-0 shadow-derek",
        className,
      )}
      style={{
        animationDelay,
      }}
      {...props}
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-4">
          <ConditionalAvatar
            image_url={image_url}
            name={name}
          />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-[#1D3640] dark:text-[#F3EDE5]">
              {name}
            </h3>
            <p className="text-sm text-[#A3A692]">
              {career_stage}
            </p>
          </div>
        </div>
        <p className="text-base text-[#3D4F4F] dark:text-[#F2E2CE]">
          {content}
        </p>
      </div>
    </figure>
  );
}

function TestimonialColumn({
  testimonials,
  className,
  containerClassName,
  shift = 0,
}: {
  testimonials: Testimonial[];
  className?: string;
  containerClassName?: (reviewIndex: number) => string;
  shift?: number;
}) {
  return (
    <TestimonialColumnContainer className={cn(className)} shift={shift}>
      {testimonials
        .concat(testimonials)
        .map((testimonial, testimonialIndex) => (
          <Testimonial
            name={testimonial.name}
            content={testimonial.content}
            image_url={testimonial.image_url}
            career_stage={testimonial.career_stage}
            logo_url={testimonial.logo_url}
            key={testimonialIndex}
            className={containerClassName?.(
              testimonialIndex % testimonials.length,
            )}
          />
        ))}
    </TestimonialColumnContainer>
  );
}

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const columns = splitArray(testimonials, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);
  return (
    <InViewDiv className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
      <TestimonialColumn
        testimonials={[...column1, ...column3.flat(), ...column2]}
        containerClassName={(tIndex) =>
          cn(
            tIndex >= column1.length + column3[0].length && "md:hidden",
            tIndex >= column1.length && "lg:hidden",
          )
        }
        shift={10}
      />
      <TestimonialColumn
        testimonials={[...column2, ...column3[1]]}
        className="hidden md:block"
        containerClassName={(tIndex) =>
          tIndex >= column2.length ? "lg:hidden" : ""
        }
        shift={15}
      />
      <TestimonialColumn
        testimonials={column3.flat()}
        className="hidden lg:block"
        shift={10}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F3EDE5] dark:from-[#1D3640]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3EDE5] dark:from-[#1D3640]" />
    </InViewDiv>
  );
}
