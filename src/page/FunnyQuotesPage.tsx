import { useEffect } from 'react';
import { useFunnyQuotes } from '../api/FunnyQuotesApi';
import Header from '../components/Header';

const FunnyQuotesPage = ({ openSidebar, setOpenSidebar }: any) => {
  const { funnyQuotesResponse, FunnyQuotesRequest, loading } = useFunnyQuotes();

  useEffect(() => {
    const apiRequest = async () => {
      await FunnyQuotesRequest();
    };
    apiRequest();
  }, []);

  const handleSubmit = () => {
    FunnyQuotesRequest();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 w-full z-10">
        <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      </div>
      <div className="max-w-[48rem] mt-20 mx-auto flex flex-1 w-full">
        {funnyQuotesResponse?.length > 0 ? (
          <div className="max-w-xl mx-auto py-2 px-4 bg-white">
            <h2 className="text-2xl font-bold text-center pb-6">
              Here are some funny quote remixes to brighten your day! 😄
            </h2>
            {funnyQuotesResponse.map((data: any, index: any) => (
              <div
                key={index}
                className="max-w-xl border-[0.1px] border-[#ecebeb] mx-auto my-8 p-4 bg-white rounded-lg shadow-sm hover:shadow-md"
              >
                <p className="font-serif text-gray-600 italic text-md mb-2">
                  {`"${data?.quote}"`}
                </p>
                <p className="font-sans text-[#525252] text-md font-semibold bg-[#f1f1f1] p-3 rounded-md">
                  {data?.funnyQuote}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <div className="text-[#000] font-semibold flex justify-center item-center">
              <p>Loading</p>
              <span className="text-gray-900 animate-pulse">.</span>
              <span className="text-gray-700 animate-pulse delay-150">.</span>
              <span className="text-gray-500 animate-pulse delay-300">.</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="curser-pointer  sticky bottom-10 mt-20 flex justify-center items-center w-full"
      >
        <div
          tabIndex={0}
          className="w-fit h-fit focus:shadow-md flex items-center justify-center gap-3 py-3 border-[0.5px] border-[#cecece] focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] rounded-full px-6 shadow z-50 bg-[#fff]"
        >
          <p className="font-normal">More Funny Quotes</p>
          <img
            src="/Loading1.svg"
            alt="Loading"
            className={`${loading && 'animate-spin'} font-light text-white`}
          />
        </div>
      </button>
    </div>
  );
};

export default FunnyQuotesPage;
