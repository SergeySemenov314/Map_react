import './CompanyInfo.css';


function CompanyInfo(props) {

    let selectedCompany = props.selectedCompany;
    let showCompanyInfo = props.showCompanyInfo;

    return(
        <>
            {showCompanyInfo &&
                <div className="company-info">
                    <p className="company-info__name">{selectedCompany.name}</p>
                    <p className="company-info__description">{selectedCompany.description}</p>
                    <div className="company-info__photo-wrapper">
                        <img src={selectedCompany.imgUrl} alt="" className="company-info__photo"/>
                    </div>
                </div>
            }
        </>
    );  
}

export default CompanyInfo;
