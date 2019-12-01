import React from 'react';
import { PropTypes } from 'prop-types';
import ResultsFilter from './../ResultsFilter/ResultsFilter';
import './ResultsSearch.css';

const ResultsSearch = ({ query, onFilterClick, filter }) => {

    return (
        <div className="container">
            <div className="columns">
                <div className="column is-three-fifths is-offset-one-fifth">
                    <div className="box search-container">
                        <div className="field is-grouped">
                            <p className="control is-expanded">
                                <input
                                    className="input is-small"
                                    type="text"
                                    defaultValue={query}
                                />
                            </p>
                            <p className="control">
                                <button href="#" className="button is-small search-button" type="submit">Cerca</button>
                            </p>
                        </div>
                        <p className="filterLabel">Filtra el tipus de servei que busques:</p>
                        <ResultsFilter 
                            onFilterClick={onFilterClick}
                            filter={filter}></ResultsFilter>
                    </div>
                </div>
            </div>
        </div>
    );

}

ResultsSearch.propTypes = {
    query: PropTypes.string.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    filter: PropTypes.shape ({
        babysitter: PropTypes.bool.isRequired,
        cleaner: PropTypes.bool.isRequired,
        pets: PropTypes.bool.isRequired,
        classes: PropTypes.bool.isRequired,
    }),
}

export default ResultsSearch;