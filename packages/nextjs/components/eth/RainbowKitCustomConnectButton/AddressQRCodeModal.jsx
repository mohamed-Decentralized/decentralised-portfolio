import { QRCodeSVG } from "qrcode.react"
import { Address } from "~~/components/eth"

export const AddressQRCodeModal = ({ address, modalId }) => {
  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative">
            <input className="h-0 w-0 absolute top-0 left-0" />
            <label
              htmlFor={`${modalId}`}
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
            >
              ✕
            </label>
            <div className="space-y-3 py-6">
              <div className="flex flex-col items-center gap-6">
                <QRCodeSVG value={address} size={256} />
                <Address address={address} format="long" disableAddressLink />
              </div>
            </div>
          </label>
        </label>
      </div>
    </>
  )
}
