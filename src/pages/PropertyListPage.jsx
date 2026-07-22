// 物件一覧画面（ログイン後に表示。Supabaseから自分が登録した物件を取得しCRUD操作を行う）
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../lib/properties'
import PropertyForm from '../components/PropertyForm'
import PropertyCard from '../components/PropertyCard'

export default function PropertyListPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // 新規登録フォームの再マウント用キー。登録成功時に値を更新して入力欄をクリアする
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch {
      setErrorMessage('物件情報の取得に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (values) => {
    setIsCreating(true)
    setErrorMessage('')
    try {
      const created = await createProperty({ ...values, userId: user.id })
      setProperties((prev) => [created, ...prev])
      setFormKey((key) => key + 1)
    } catch {
      setErrorMessage('物件の登録に失敗しました。')
    } finally {
      setIsCreating(false)
    }
  }

  // 更新に成功した場合はtrueを返し、呼び出し元（カード）で編集モードを終了する
  const handleUpdate = async (id, values) => {
    setErrorMessage('')
    try {
      const updated = await updateProperty(id, values)
      setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
      return true
    } catch {
      setErrorMessage('物件の更新に失敗しました。')
      return false
    }
  }

  const handleDelete = async (id) => {
    setErrorMessage('')
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setErrorMessage('物件の削除に失敗しました。')
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          <p className="property-header-user">{user?.email}でログイン中</p>
        </div>
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      <section className="property-create">
        <h2>新規物件登録</h2>
        <PropertyForm
          key={formKey}
          submitLabel="登録"
          isSubmitting={isCreating}
          onSubmit={handleCreate}
        />
      </section>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      {isLoading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録された物件がありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
