import Image from "next/image";

export default async function HeaderMain() {
  const req: any = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL + "/api/profile"
  );
  const profile = await req.json();

  // console.log("profile", profile);

  return (
    <div className="flex p-4">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={profile.avatar_url}
          alt="profile image"
          width={50}
          height={50}
        />
        <div>
          <h3> {profile.name}</h3>
          <span>
          {profile.username}
          </span>
          <span className="opacity-30"> ({profile.email})</span>
        </div>
      </div>
    </div>
  );
}
