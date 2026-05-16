type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="border-b border-slate-700 bg-transparent px-4 py-3">
      <div className="mx-auto flex w-full max-w-md items-center justify-between">
        <h1 className="text-base font-medium text-slate-100">{title}</h1>
        <button
          type="button"
          aria-label="사용자 메뉴"
          className="rounded-sm border border-slate-600 px-3 py-1 text-sm text-slate-200"
        >
          User
        </button>
      </div>
    </header>
  );
}
