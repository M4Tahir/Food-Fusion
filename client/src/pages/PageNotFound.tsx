import { Heading, LinkButton } from "../components";

const PageNotFound = () => {
  return (
    <div
      className="flex justify-center items-center w-full h-dvh bg-background px-40 aspect-square stroke-warning">
      <div
        className="bg-error/20 text-red-800 p-8 border border-error rounded-2xl max-w-[550px] w-full text-center space-y-4"
        role="alert">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               className="h-20 aspect-square stroke-warning">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>

        <Heading type="h1" align="center">404 - Page Not Found</Heading>
        <p className="mb-5">The page you're looking for doesn’t exist or has been moved.</p>
        <LinkButton replace={true} to="/" type="secondary"> Go to Homepage</LinkButton>
      </div>
    </div>
  );
};

export default PageNotFound;
