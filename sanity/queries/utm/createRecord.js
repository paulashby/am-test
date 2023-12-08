import client from "../../sanity.client";

export async function createRecord(spec) {
    

    /* 
    spec = {
        source: <slug>
    }
    
    We probably want to create this record bottom up,
    so we can add each element as we go

    so 
        
        const formId = < get the form id based on the slug >

        const submissionSpec = { 
            _type: "formSubmission",
            form: formId,
            < plus any of the following >
            medium: ?,
            content: ?,
            term: ?
        }

        Assuming it's as simple as providing the submissionSpec object

        Then we need to use the following from the main site 
        sanity.query.arrayItem->setArrayItem(submissionSpec, arrayId)
        where array_id is the id of the array in the source

        No - hang about - this is wrong - I put a reference to the source in the submission rather than vice versa
        - see /Users/pablo/Documents/AlphaMolly/Notes/Tickets/CTA utm groq queries.txt:

        and check the test submission on the main site - yeah - source goes in the submission


        Just thinking about if we had submissions that are page loads rather than forms
        we could say that if form id isn't included and campaign is then this is a page submission
        - if a new page is loaded it looks like the params are removed, so these would be counted once per visit.

        Meanwhile, if we're handling a form submission, the form has the campaign so we don't need to provide that in the url
        but given it will make life easier, we may as well
        
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        My p
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        Also, the name of the submission is the name of the form followed by the slug of the source

        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        WE CAN PROVIDE VALIDATION RULES TO THE SANITY FIELDS SO WE CAN USE THE SAME REGEX AS WE DO TO VALIDATE THE INPUT HERE
        validation: validation: Rule => Rule.required().min(2).regex(pattern[, options])
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Develop a regex for this.

        Also, develop a regex for the platforms.
        [a-Z\d)(.-&]
        could write a node app to test that all the current platforms pass it

        So the flow is even simpler - 

            get the campaign
                validate
                    - exit if fails
                    Check that the campaign exists and is still running
                    - exit if over
                get the form slug
                    validate
                    - exit if fails
                    get the form name
                        no need to validate - this is from sanity
                    get the source slug
                        validate
                        - exit if fails
                        concatonate form name and source slug - this is the name of the submission
                        create a submission object
                            submission = {
                                name: < concatonated form name + source slug >
                            }
                        get the source id
                            no need to validate - this is from sanity
                            submission.utm_source = < source id >

                        if medium, content or term are present, validate
                        and add to submission object
                        append suffix (-m, -c, -t )to submission name

                        create the object

                Get it working without validation first

                
                        

            

            sanitise the values
            
            we basically just make the submission and it will there in submissions -
            no need to add to an array.

            In addition to the data required to make the submission record, we also need the name of the form and the slug of the source.
            Also, could consider suffixing with -m-c-t as appropriate



        On a totally separate note, refactor the sanity.query.arrayItem->setArrayItem(submissionSpec, arrayId) 
        to take any data - "Platform" is currently hard coded

        

        

    source
        submission
            form
            medium
            content
            term
    */
    const itemTypesKey = `${item._type}s`;

/*      

        
    groq`
        [
            ...*[_type=="form" && slug.current == $formSlug]
                {
                    name,
                    "timeframe": utm_campaign->{"start": startDate, "end": endDate}
                },
            ...*[_type=="utm_source" && slug.current == $sourceSlug]
                {
                    _id
                },
        ]`,
        {formSlug},
        {sourceSlug: utm.source},
        {cache: 'no-store'}



    /////////////////////////////////
    // This query ///////////////////

    [
    ...*[_type=="form" && slug.current == $formSlug]
        {
            name,
            "timeframe": *[_type=="utm_campaign" && slug.current == $campaignSlug]{"start": startDate, "end": endDate}[0]
        },
    ...*[_type=="utm_source" && slug.current == $sourceSlug]._id,
    ],
    {formSlug: "updates"},
    {campaignSlug: "earlybird"},
    {sourceSlug: "ani"},
    {cache: "no-store"}

    // Returns //////////////////////

    [
        {
            name: "Updates",
            timeframe: {
                start: 2023-11-22
                end: null
            }
        },
        "8144a597-3809-4ef5-9d2d-6bff604d1c9b"
    ]

    destructure

    const [formProperties, sourceProperties] = resultOfThatGroq;

    /////////////////////////////////
    /////////////////////////////////




    




    // Make submission record for form submission
    // !! This should only happen when a form is submitted.
    // So with the newsletter, we have two possible submissions -
    // newsletter and platform. 
    // Guess we have two submissions to make our reward system more granular

    const [formProperties, sourceId] = resultOfThatGroq;

    and now we have

    formProperties = {
        name: "Updates",
        timeframe: {
            start: 2023-11-22
            end: null
        }
    };
    sourceId = "8144a597-3809-4ef5-9d2d-6bff604d1c9b";




        get the form slug
            get the form name
            get the source slug
            concatonate form name and source slug - this is the name of the submission
                create a submission object
                    submission = {
                        name: < concatonated form name + source slug >
                    }
                get the source id
                    submission.utm_source = < source id >

                if medium, content or term are present, validate
                and add to submission object
                append suffix (-m, -c, -t )to submission name

                create the object
*/

/* 



    



*/
    
    return client.transaction()
    .create({
        _id: "submission.",
        ...item})
    .commit({autoGenerateArrayKeys: true})
    .then(response => {
        // Separate transaction lets us use the generated id of the new entry
        const id = response.results[0].id;
        addToArray(id, arrayId, itemTypesKey);       
    })
    .catch(error => console.error(error));
}