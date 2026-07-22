// 物件の登録・編集で共通利用する入力フォーム
import { useState } from 'react'

const EMPTY_VALUES = { name: '', rent: '', area: '', layout: '' }

export default function PropertyForm({
  initialValues = EMPTY_VALUES,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ ...form, rent: Number(form.rent) })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="property-form-row">
        <label htmlFor="name">物件名</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="property-form-row">
        <label htmlFor="rent">家賃（円）</label>
        <input
          id="rent"
          name="rent"
          type="number"
          min="0"
          value={form.rent}
          onChange={handleChange}
          required
        />
      </div>

      <div className="property-form-row">
        <label htmlFor="area">エリア名</label>
        <input
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        />
      </div>

      <div className="property-form-row">
        <label htmlFor="layout">間取り</label>
        <input
          id="layout"
          name="layout"
          placeholder="例：1LDK"
          value={form.layout}
          onChange={handleChange}
          required
        />
      </div>

      <div className="property-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
