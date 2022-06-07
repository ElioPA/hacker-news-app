import { ButtonGroup } from "../ButtonGroup";
import { Dropdown } from "../Dropdown";
import { PostsList } from "../PostsList";
import { useGlobalContext } from '../../hooks/useGlobalContext';
import './styles.css';

export function Main() {

    const { filter } = useGlobalContext();

    return (
        <main className="main">
            <ButtonGroup />
            <Dropdown />
            {filter && <PostsList key={filter} />}
        </main>
    )
}
