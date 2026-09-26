type PlaceholderPageProps = {
  kicker: string;
  title: string;
};

export default function PlaceholderPage({ kicker, title }: PlaceholderPageProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <p className="kicker">{kicker}</p>
      <h1 className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed">
        Weaving this chapter — back soon.
      </p>
    </section>
  );
}
