import ProductLoader from '@/components/product/product-loader'

function loading() {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array(9)
                .fill(null)
                .map((_, index) => (
                    <ProductLoader key={index} />
                ))}
        </div>
    )
}

export default loading
