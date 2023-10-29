import React from 'react';
import '../index.css';

export function StatsTable({data}) {
    if (!data) {
        return null;
    }

    return (
        <React.Fragment>
            <table className='stats-table'>
                <thead>
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                      <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>HP</td>
                        <td>{data.hp}</td>
                        <td>{data.type1}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>{data.attack}</td>
                        <td>{data.type2}</td>
                    </tr>
                    <tr>
                        <td>Special Attack</td>
                        <td>{data.special_attack}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{data.defense}</td>
                    </tr>
                    <tr>
                        <td>Special Defense</td>
                        <td>{data.special_defense}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{data.speed}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

