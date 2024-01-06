import DarkThemeToggleSwitch from "@/components/DarkThemeToggleSwitch";

interface HeaderComponentProps  {
    title: string;
    transparentBackground?: boolean;
};

export default function HeaderComponent(props: HeaderComponentProps) {
    return (
        <header className={`${props.transparentBackground == true ? "" : "bg-back-secondary-light dark:bg-back-dark " } pt-8 pb-10 mb-4 flex flex-col gap-4 items-center w-full `}>
          <h1 className='text-3xl font-semibold dark:text-blue-balloons-dark'>{props.title}</h1>
          <DarkThemeToggleSwitch />
        </header>
    );
};