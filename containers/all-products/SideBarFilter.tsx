import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

import PriceSlider from '@/app/products/_components/price-slider'
import CategoryPicker from '@/app/products/_components/category-picker'
import { getMaxPrice } from '@/lib/actions/product'

async function SideBarFilter() {
    let maxPrice = await getMaxPrice()

    if (maxPrice) maxPrice = Math.ceil(maxPrice)

    return (
        <aside className='md:basis-1/3 lg:basis-1/5 mb-10 lg:mb-0'>
            <Accordion type='multiple' className='w-full'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger className='font-semibold'>
                        Category
                    </AccordionTrigger>
                    <AccordionContent>
                        <CategoryPicker />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger className='font-semibold'>
                        Price
                    </AccordionTrigger>
                    <AccordionContent className='my-1'>
                        <PriceSlider defaultMaxPrice={maxPrice} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}

export default SideBarFilter
