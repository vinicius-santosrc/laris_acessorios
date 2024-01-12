import { Ring } from "@uiball/loaders";

export default function Loading() {
    return (
        <div className="loading">
            
            <div className="loadinginner">
                <Ring
                    size={60}
                    lineWeight={5}
                    speed={2}
                    color="#EF59A0"
                />
            </div>

        </div>
    )
}