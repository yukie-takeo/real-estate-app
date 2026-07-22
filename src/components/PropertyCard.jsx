// 物件1件分の表示・編集・削除を担当するカード
import { useState } from 'react'
import PropertyForm from './PropertyForm'

export default function PropertyCard({ property, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async (values) => {
    setIsSaving(true)
    const success = await onUpdate(property.id, values)
    setIsSaving(false)
    if (success) setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return
    setIsDeleting(true)
    await onDelete(property.id)
    setIsDeleting(false)
  }

  if (isEditing) {
    return (
      <div className="property-card">
        <PropertyForm
          initialValues={{
            name: property.name,
            rent: property.rent,
            area: property.area,
            layout: property.layout,
          }}
          submitLabel="保存"
          isSubmitting={isSaving}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p className="property-card-rent">{property.rent.toLocaleString()}円 / 月</p>
      <p className="property-card-area">{property.area}</p>
      <p className="property-card-layout">{property.layout}</p>
      <div className="property-card-actions">
        <button type="button" onClick={() => setIsEditing(true)}>
          編集
        </button>
        <button
          type="button"
          className="danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '削除中...' : '削除'}
        </button>
      </div>
    </div>
  )
}
