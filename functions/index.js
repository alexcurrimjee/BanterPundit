const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.https.onCall(async (data, context) => {
  const { email, password, firstName, lastName } = data;
  const displayName = firstName + ' ' + lastName;

  try {
    let userRecord;
    if (password) {
      // Create a new user using Firebase Auth for email/password sign-up
      userRecord = await admin.auth().createUser({ email, password, displayName });
    } else {
      // For Google sign-up, find the existing user by email
      userRecord = (await admin.auth().getUserByEmail(email)).toJSON();
    }

    // Create a new document in Firestore to store user details
    await db.collection('users').doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      score: 0,
    });

    return { success: true };
  } catch (error) {
    console.error('Error during user creation:', error);
    throw new functions.https.HttpsError('internal', 'Error during user creation', error);
  }
});
