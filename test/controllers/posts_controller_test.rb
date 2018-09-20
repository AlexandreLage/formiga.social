require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:one)
  end

  test "should get index" do
    get posts_url, as: :json
    assert_response :success
  end

  test "should create post" do
    assert_difference('Post.count') do
      post posts_url, params: { post: { address1: @post.address1, address2: @post.address2, city: @post.city, date: @post.date, description: @post.description, id: @post.id, issue_solved: @post.issue_solved, issue_type: @post.issue_type, maps_marker: @post.maps_marker, number: @post.number, post_type: @post.post_type, state: @post.state, title: @post.title } }, as: :json
    end

    assert_response 201
  end

  test "should show post" do
    get post_url(@post), as: :json
    assert_response :success
  end

  test "should update post" do
    patch post_url(@post), params: { post: { address1: @post.address1, address2: @post.address2, city: @post.city, date: @post.date, description: @post.description, id: @post.id, issue_solved: @post.issue_solved, issue_type: @post.issue_type, maps_marker: @post.maps_marker, number: @post.number, post_type: @post.post_type, state: @post.state, title: @post.title } }, as: :json
    assert_response 200
  end

  test "should destroy post" do
    assert_difference('Post.count', -1) do
      delete post_url(@post), as: :json
    end

    assert_response 204
  end
end
