import useLoading from '../hooks/useLoading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingSpinner() {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div className='loading-spinner-overlay'>
          <DotLottieReact
                        className="lottie-hp"
                        src="/KoiFish.lottie"

                        loop
                        autoplay
                    />
        </div>
      )}
    </>
  );
}