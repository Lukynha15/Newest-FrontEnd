"use client";

import { Heart, MessageCircle } from "lucide-react";

export default function Post() {
  return (
    <article className="w-full bg-accent border border-input rounded-2xl p-4 flex flex-col gap-3">

      <header>
        <span className="text-sm text-muted-foreground">Lucas</span>
        <h1 className="text-2xl font-medium leading-tight mt-1">
          BBB26 está pegando fogo
        </h1>
      </header>

      <section className="text-sm leading-relaxed">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Adipisci rerum, tenetur ullam odio fugiat reprehenderit accusantium
        delectus aperiam suscipit voluptatum repellendus non! Debitis,
        perspiciatis incidunt! Illum quo necessitatibus neque hic?
      </section>

      <footer className="mt-auto pt-3 border-t border-input flex justify-evenly">
        <button className="cursor-pointer">
          <Heart size={20} />
        </button>
        <button className="cursor-pointer">
          <MessageCircle  size={20} />
        </button>
      </footer>
    </article>
  );
}
