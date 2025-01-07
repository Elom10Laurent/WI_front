import { useDelete } from '../lib/hooks';

interface DeleteButtonProps {
  resourceId: string;
  endpoint: string;
  styles?: string;
}

export default function DeleteButton({ resourceId, endpoint, styles }: DeleteButtonProps) {
  const { remove, loading, error } = useDelete({
    endpoint: `${endpoint}/${resourceId}`,

  });

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      try {
        await remove();
        alert('Ressource supprimée avec succès!');
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={handleDelete}
        className={styles}
        disabled={loading}
      >
        {loading ? 'Suppression...' : 'Supprimer'}
      </button>
      {error && <p className='text-red-500 mt-2'>Réessayer</p>}
      {/* Optionnel : message de succès */}
      {/* {response && <p style={{ color: 'green' }}>Ressource supprimée avec succès!</p>} */}
    </div>

  );
}
