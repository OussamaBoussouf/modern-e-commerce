import SuccessfulPurchaseModal from '@/components/successful-purchase-modal'
import HeadPhonesSection from '@/containers/home-page/HeadPhonesSection'
import HeroSection from '@/containers/home-page/HeroSection'
import NewArrivals from '@/containers/home-page/NewArrivals'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <HeroSection />
      <HeadPhonesSection />
      <NewArrivals />
      {searchParams.session_id && <SuccessfulPurchaseModal />}
    </>
  )
}
