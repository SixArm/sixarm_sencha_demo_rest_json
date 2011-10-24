// Sencha demo. Please see the README.md file for more information.

// Load everything
Ext.require(['*']);

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: ['id','name', 'email'],
    
    // Proxies are used by Stores to load and save Model data.
    // Proxies can be defined directly on a Model; this enables us to
    // to load and save Model data without needing a separate Store.
    // It also enables us to use this one proxy for many Stores.
    proxy: {

	// Proxy type is one of Memory, Local Storage, AJAX, JSONP, REST, etc.
	// The type determines how the proxy marshalls data and associations.
	// For our demo we will simulate a REST proxy to load and save data.
        type: 'rest',

	// This demo is a simulation so we have created a file "/data/users"
	// that has JSON data, including a simulated JSON success response
	// and three simulated users: Alice, Bob, Carol.
        url : 'data/users',

        reader: {
	    type: 'json',
	    root: 'users'
        }
    }
    
});


Ext.onReady(function() {

    // Create the data Store via the User Model's Proxy.
    Ext.create('Ext.data.Store', {
	model: 'User',
	autoLoad: true
    });

    // Get a reference to the User class; this is shorthand.
    // We will use this to create a user in the next step.
    var User = Ext.ModelMgr.getModel('User');

    // Create a User. The user's id will be come from the proxy.
    var alice = Ext.create('User', {
	name: 'Alice',
	email : 'alice@example.com'
    });

    // We can save Alice directly (without having to add her to a store)
    // because we configured a RestProxy; when we save Alice this will
    // automatically send a POST request to the proxy URL "/data/users".
    alice.save({

	// In this demo we're just simulating the request and response,
	// by using a "/data/users" file which has a simulated response;
	// the file already defines alice and a couple other users.
	success: function(alice) {
            console.log("Save success: Alice's ID is "+ alice.getId());
	},
	failure: function(alice) {
            console.log("Save failure: Alice was not saved.");
	}
    });

});