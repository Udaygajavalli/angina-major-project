import json
import pickle

def handler(event, context):
    try:
        eventBody = json.loads(event["body"])
        print(eventBody)
        Female = [1.0, 0.0, 0.0]
        Male = [0.0, 1.0, 0.0]
        Other = [0.0, 0.0, 1.0]

        Govt_job = [1.0, 0.0, 0.0, 0.0, 0.0]
        Never_worked = [0.0, 1.0, 0.0, 0.0, 0.0]
        Private = [0.0, 0.0, 1.0, 0.0, 0.0]
        Self_employed = [0.0, 0.0, 0.0, 1.0, 0.0]
        children = [0.0, 0.0, 0.0, 0.0, 1.0]

        Unknown = [1.0, 0.0, 0.0, 0.0]
        formerly_smoked = [0.0, 1.0, 0.0, 0.0]
        never_smoked = [0.0, 0.0, 1.0, 0.0]
        smokes = [0.0, 0.0, 0.0, 1.0]
        if eventBody["gender"] == 'Female':
            new_data = Female
        elif eventBody["gender"] == 'Male':
            new_data = Male
        elif eventBody["gender"] == 'Other':
            new_data = Other

        if eventBody["work_type"] == 'Govt_job':
            new_data = new_data + Govt_job
        if eventBody["work_type"] == 'Never_worked':
            new_data = new_data + Never_worked
        if eventBody["work_type"] == 'Private':
            new_data = new_data + Private
        if eventBody["work_type"] == 'Self_employed':
            new_data = new_data + Self_employed
        if eventBody["work_type"] == 'children':
            new_data = new_data + children

        if eventBody["smoking_status"] == 'Unknown':
            new_data = new_data + Unknown
        if eventBody["smoking_status"] == 'formerly_smoked':
            new_data = new_data + formerly_smoked
        if eventBody["smoking_status"] == 'never_smoked':
            new_data = new_data + never_smoked
        if eventBody["smoking_status"] == 'smokes':
            new_data = new_data + smokes

        new_data.insert(len(new_data), eventBody["age"])
        new_data.insert(len(new_data), eventBody["hypertension"])
        new_data.insert(len(new_data), eventBody["heart_disease"])

        if eventBody["ever_married"] == "Yes":
            new_data.insert(len(new_data), 1)
        if eventBody["ever_married"] == "No":
            new_data.insert(len(new_data), 0)

        if eventBody["Residence_type"] == "Urban":
            new_data.insert(len(new_data), 1)
        if eventBody["Residence_type"] == "Rural":
            new_data.insert(len(new_data), 0)

        new_data.insert(len(new_data), eventBody["avg_glucose_level"])
        new_data.insert(len(new_data), eventBody["bmi"])
        # print(new_data)
        print(new_data)
        with open('./model_pkl', 'rb') as f:
            classifier = pickle.load(f)
        new_pred = classifier.predict([new_data])
        return {
            'statusCode': 200,
            'body': str(new_pred[0])
        }
    except Exception as e:
        print(f"something went wrong! - {e}")
        return {
            'statusCode': 400,
            'body': f"Something went wrong! - {e}"
        }
