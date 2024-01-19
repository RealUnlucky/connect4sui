module game_board::board {
    use std::string::{String, utf8};
    use std::vector;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    // Define a constant error code for wrong coordinates
    const EWrongCoordinates: u64 = 0;

    struct Board has key {
        id: UID,
        dimension_x: u64, // The horizontal dimension of the board
        dimension_y: u64, // The vertical dimension of the board
        tokens: vector<vector<String>> // A two-dimensional vector of strings representing the colors of the tokens
    }

    public fun create_board(dim_x: u64, dim_y: u64, ctx: &mut TxContext) {
        let tokens = vector::empty<vector<String>>(); // Create an empty vector of vectors of strings
        let i = 0; // Initialize a loop counter i
        
        while (i < 7) { 
            let tmp_vec = vector::empty<String>(); // Create an empty vector of Strings

            let j = 0; // Initialize another loop counter j
            while (j < 6) { 
                vector::insert(&mut tmp_vec, utf8(b"#ffffff"), j); // Insert a string representing white color ("ffffff") at index j in tmp_vec
                j = j + 1; // Increment j by 1
            };

            vector::insert(&mut tokens, tmp_vec, i); // Insert tmp_vec at index i in tokens
            i = i + 1; // Increment i by 1
        };

        transfer::share_object(
            Board {
                id: object::new(ctx),
                dimension_x: dim_x, // The dimension_x is set to the parameter dimension
                dimension_y: dim_y, // The dimension_y is set to the parameter dimension
                tokens // The tokens is set to the vector of vectors created above
            }
        );
    }

    /// Private function that drops a single token on the board
    fun drop_token(self: &mut Board, x: u64, player: String): bool {
        assert!(x < self.dimension_x && y < self.dimension_y, EWrongCoordinates); // Check that the coordinates are valid and within bounds, otherwise abort with error code EWrongCoordinates
        let mut_vector = vector::borrow_mut(&mut self.tokens, x); // Borrow a mutable reference to the vector at index x in self.tokens\
        
        let i = 0;
        while (i < 6) {

            let open_space = *vector::borrow_mut(mut_vector, i);

            if (open_space == utf8(b"#ffffff")) {

                open_space = player;
                return true;

            }

            i = i + 1;
        }

        return false;

    }

    public fun drop_single_token(self: &mut Board, x: u64, player: String): bool {
        return drop_token(self, x, player); // Call update_token with self, x, y and color as arguments
    }

}