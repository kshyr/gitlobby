export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-2 px-10 text-sm [&>*]:font-extralight">
      <span className="flex items-center justify-start gap-1">
        With love to{" "}
        <strong className="bg-gradient-to-br from-[#b2b69b] to-[#bb80e8] bg-clip-text font-semibold text-transparent hover:from-[#d6dbbb] hover:to-[#cc8dfc]">
          <a href="https://github.com/" className="">
            GitHub &#9825;
          </a>
        </strong>
      </span>
      <span className="font-extralight">
        <strong>Kostiantyn Shyrolapov</strong> @ 2022
      </span>

      <span className="font-extralight">
        Powered by{" "}
        <strong className="bg-gradient-to-br from-white to-[#aaaaaa] bg-clip-text font-normal text-transparent underline decoration-[#aaaaaa] underline-offset-2 hover:decoration-white">
          <a href="https://docs.github.com/en/rest">GitHub REST API</a>
        </strong>
      </span>
    </footer>
  );
}
