import { render, screen, cleanup } from '@testing-library/react';
import SearchBar from './index';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const setup = () => render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
)

describe("Searchbar component should render", () => {
    beforeEach(setup)
    afterEach(cleanup);

    it("Success rendered", () => {
        const searchInput = screen.getByTestId("search-input");
        const buttonSearch = screen.getByTestId("search-button");

        expect(searchInput).toBeInTheDocument();
        expect(buttonSearch).toBeInTheDocument();
        
    });

    it("Can type in search track", ()=>{
        const searchInput = screen.getByTestId("search-input");

        userEvent.type(searchInput, 'tes');

    });
});