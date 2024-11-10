interface addressType {
    publicAd: string,
    privateAd: string
}
export const AddressCard = ({publicAd,privateAd} : addressType) => {
    return (
        <div className="flex flex-col p-4">
            <div>{publicAd}</div>
            <div className="flex justify-between">
                {privateAd}
                <div>icon</div>
            </div>
        </div>
    )
}