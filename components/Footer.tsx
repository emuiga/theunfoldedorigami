export function Footer() {
  return (
    <footer className="mt-24 pt-12 border-t border-[#333] text-sm text-[#888] pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-light">
          © {new Date().getFullYear()} The Unfolded Origami
        </p>
        <p className="font-light">
          Ideas, slowly unfolded.
        </p>
      </div>
    </footer>
  );
}

