import axios from "axios";
import React from "react";
import Multiselect from "multiselect-react-dropdown"
import { useNavigate } from "react-router-dom";

export class CreatePerson extends React.Component{

    state = {
        name: "",
        number: "",
        city: "",
        country: "",
        languages: [],

        allCountries: [],
        allCities: [],
        allLanguages: []
    } 

    componentDidMount(){
        axios.get("https://localhost:7148/api/react/countries")
        .then (response => this.setState({allCountries: response.data})) 

        axios.get("https://localhost:7148/api/react/languages")
        .then (response => this.setState({allLanguages: response.data}))
    }

    


    handleSubmit = () => {
        //event.preventDefault();
        var languageList = [];
        this.state.languages.map ((language) => {
            language.map((id) => {
                if(!languageList.includes(id.languageId))
                languageList.push(id.languageId)
            })  
             
        })
        
        const person = {
            name : this.state.name,
            number: this.state.number,
            city: this.state.city,
            country: this.state.country,
            languages: languageList
        }

        this.CreateNewPerson(person);
    }

    async CreateNewPerson (person) {
        console.log(JSON.stringify(person))
        

        fetch('https://localhost:7148/api/react/create/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
        
        })

        // await axios.post(`https://localhost:7148/api/react/${person}`)
        // .then (response => console.log(response)) 
    }

    setCountry(e){
        this.setState({country : e.target.value})
    }

    fetchCities(e){
        axios.get("https://localhost:7148/api/react/cities/" + e)
        .then(response => this.setState({allCities: response.data}))
    }

    
    onSelect(selectedItem){
        const language = selectedItem.languageName
        console.log(language)
        this.state.languages.push(language)

    }
    

    
    render(){
        
        while(this.state.allCountries == null)
        {
            return(<div>
                {console.log("no countries")}
            </div>)
        }
                
        return(
            
        <div className="container add-person mt-5">
        <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name *" onChange={(e => this.setState({name : e.target.value}))} /> <br />
                <input type="text" name="number" placeholder="Phone Number *" onChange={(e => this.setState({number : e.target.value}))} /> <br />
                
                <select name="country" defaultValue={"default"} onChange={e => { this.setCountry(e); this.fetchCities(e.target.value) }}>
                    <option disabled value="default">Select Country *</option>
                    {this.state.allCountries.map ((country) => {
                        return <option key={country.countryId} value={country.countryId}>{country.countryName}</option>     
                    })} 
                </select>
                <br />
                <select name="city" defaultValue={"default"} onChange={(e => this.setState({city : e.target.value}))}>
                    <option disabled value="default">Select City *</option>
                    {this.state.allCities.map ((city) => {
                        return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>     
                    })} 
                </select>
                
                <br />
                {/* <select multiple={true} name="languages" placeholder="Languages" onChange={(e => this.setState({languages : e.target.value}))}>
                    <option disabled value="default">Select Languages *</option>
                    {this.state.allLanguages.map ((language) => {
                        return <option key={language.languageId} value={language.languageId}>{language.languageName}</option>     
                    })} 
                </select>  */}

                <Multiselect class="multiselect"options={this.state.allLanguages}
                onSelect={e => this.state.languages.push(e)}
                dataKey="languageId"
                placeholder="Select Languages"
                onRemove={e => this.state.languages.pop(e)}
                displayValue="languageName"/>
                
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    )
    
}
}