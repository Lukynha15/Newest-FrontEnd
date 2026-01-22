import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="p-3 border-b-2">
      <div className="flex items-center">
        <Image src="/profilePicture.png" alt="Profile Picture" width={160} height={160} className="rounded-full object-cover w-44 h-44" />
        <div className="ml-4 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Lucas Assmann</h1>
          <div>
            <p className="text-sm text-muted-foreground">Membro desde 2021</p>
            <p className="mt-1 text-sm text-muted-foreground">12 posts</p>
            <p className="mt-1 text-sm text-muted-foreground">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis exercitationem obcaecati quis provident voluptate ea explicabo porro necessitatibus aliquid numquam, perferendis laudantium, tempore, cumque nam qui hic minus eius consequuntur!</p>
          </div>
        </div>
      </div>
    </div>
  );
}