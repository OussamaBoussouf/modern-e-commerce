import { Slider } from "@/components/ui/slider";


function DoubleSlider() {
    return (
        <div className="relative">
            <Slider className="absolute top-0" defaultValue={[0]} max={100} step={5} />
            <Slider className="absolute top-0" defaultValue={[50]} max={100} step={5} />
        </div>
    );
}

export default DoubleSlider;