import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanityImageUrl";

interface PortableTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).auto("format").url();
      return (
        <figure className="my-8">
          <img
            src={imageUrl}
            alt={value.alt ?? ""}
            className="w-full rounded-xl object-cover"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-foreground/50 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.blank ? "_blank" : "_self";
      const rel = value?.blank ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg font-semibold text-foreground mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 py-1 my-6 italic text-foreground/70 bg-secondary/40 rounded-r-lg pr-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-5 text-foreground/80 text-base md:text-lg leading-relaxed pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-foreground/80 text-base md:text-lg leading-relaxed pl-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

const PortableTextRenderer = ({ value }: PortableTextRendererProps) => {
  if (!value || value.length === 0) return null;
  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  );
};

export default PortableTextRenderer;
