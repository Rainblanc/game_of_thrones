import { Card } from 'components/card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ResourcesRoot = () => {
  const resources = useSelector((state) => state.resource.root);

  return (
    <div className="grid grid-cols-3 gap-3">
      {resources.map((resource, idx) => (
        <Link to={`/resources/${resource.identifier}`} key={idx}>
          <Card>
            <b className="text-primary-main">{resource.name}</b>
            <p>{resource.url}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export { ResourcesRoot };
