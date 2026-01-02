import { useAttributeTerms } from '../../hooks/useFilters';
import CheckboxFilter from './CheckboxFilter';

export default function AttributeFilter({ attribute }) {
  const { data: terms, isLoading } = useAttributeTerms(attribute.id);

  return (
    <CheckboxFilter
      label={attribute.name}
      filterKey={`pa_${attribute.slug}`}
      options={terms || []}
      isLoading={isLoading}
    />
  );
}
