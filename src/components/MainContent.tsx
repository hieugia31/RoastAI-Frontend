import Header from './Header';
import RoastDisplay from './RoastDisplay';

const MainContent = ({
  setOpenSidebar,
  openSidebar,
  roastData,
  loading,
  handleSubmit,
  onSubmit,
  register,
  handleInputChange,
  floatingSendButton,
}: any) => {
  return (
    <>
      {/* Header */}
      <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      {/* Main Page */}
      <div
        className={`max-w-[48rem] mx-auto h-full flex flex-col flex-1 px-4 sm:px-8 transition-all duration-300`}
      >
        {/* Response Section  */}
        <div className="overflow-y-auto flex-1 flex justify-center">
          <RoastDisplay roastData={roastData} loading={loading} />
        </div>
        {/* Ask anything */}
        <div className="sticky bottom-0 left-0 right-0 w-full rounded-t-xl flex flex-col bg-[#ffffff]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex items-end py-4 pl-6  rounded-[1.25rem] shadow-c"
          >
            <textarea
              {...register('AskAnything')}
              placeholder="Ask anything"
              className="appearance-none resize-none custom-scrollbar min-h-[2rem] max-h-[6.25rem] pr-12 outline-none  text-[1rem] placeholder:text-[1rem] w-full"
              rows={1}
              onChange={(e) => {
                handleInputChange(e);
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button
              disabled={!floatingSendButton}
              type="submit"
              className={` absolute outline-none rounded-full right-2 p-2 ${floatingSendButton ? 'bg-[#000] hover:bg-[#303030] text-[#ffffff]' : 'bg-[#f0f0f0] text-[#3D3D3D]'}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={`icon transition-transform duration-700 ${
                  floatingSendButton ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
              </svg>
            </button>
          </form>
          <p className="text-[12px] text-[#5d5d5d] my-2 text-center">
            AI-generated content may be sensitive or offensive. We do not
            endorse or take responsibility. Use with discretion.
          </p>
        </div>
      </div>
    </>
  );
};

export default MainContent;
