import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useFetch';
import SchoolCard from './SchoolCard';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import './school.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearEroors, getSchools } from '../../actions/schoolsActions';
const Schools = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState(0);
  const [fee, setFee] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const dispatch = useDispatch();

  const { loading, error, schools } = useSelector((state) => state.allSchools);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }
    dispatch(getSchools());
  }, [dispatch, error]);

  return (
    <>
      <div className='search'>
        <div className='container'>
          <form onSubmit={(e) => {}}>
            <div className='from-control search'>
              <i className='bx bx-search'></i>
              <input
                type='text'
                placeholder={`${t('srch_input')}`}
                className='form-control'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='line'></div>
            <div className='from-control address'>
              <i className='bx bx-current-location'></i>
              <select
                className='form-select form-select-sm'
                value={address}
                onChange={(e) => setAddress(e.target.value)}>
                <option defaultValue='' value=''>
                  {t('all')}
                </option>
                {/* {wilayas.map((wilaya, i) => (
                  <option value={wilaya.id} key={i}>
                    {wilaya.name}
                  </option>
                ))} */}
                <option>wilaya</option>
              </select>
            </div>
            <div className='line'></div>
            <div className='from-control fees'>
              <i className='bx bx-dollar-circle'></i>
              <select
                className='form-select form-select-sm'
                value={fee}
                onChange={(e) => setFee(e.target.value)}>
                <option defaultValue='' value=''>
                  {t('all')}
                </option>
                <option value='Free'>{t('free')}</option>
                <option value='Paid'>{t('paid')}</option>
              </select>
            </div>
            <div className='from-control submit'>
              <button type='submit'>{t('srch')}</button>
            </div>
          </form>
        </div>
      </div>

      <div className='schools' id='schools'>
        <div className='container'>
          <div className='content'>
            <h3>{t('mst_popular_sql')}</h3>
          </div>
          <div className='schools-container'>
            {schools.slice(0, 3).map((school, i) => (
              <SchoolCard school={school} key={i} />
            ))}
          </div>
          <Link to='/exploreSchools' className='button active'>
            {t('see_all')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Schools;
