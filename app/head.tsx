export default function Head() {
  return (
    <>
      <title>GitLobby</title>
      <meta name="title" property="og:title" content="GitLobby" />
      <meta
        name="description"
        property="og:description"
        content="GitHub API consumption app"
      />
      <meta
        name="image"
        property="og:image"
        content="https://i.ibb.co/hshNyH8/gitlobby.png"
      />
      <meta
        name="url"
        property="og:url"
        content="https://gitlobby.vercel.app/"
      />
      <meta property="og:type" content="website" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
