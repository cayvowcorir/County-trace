
    angular.module('countytraceApp').controller('commentsCtrl', function ($scope, $sce) {
        var markdown, postAuthorEmail;
        postAuthorEmail = 'cayvowcorir@gmail.com';
        $scope.comments = [
            {
                id: 1,
                author: {
                    name: 'Jan-Kanty Pawelski',
                    email: 'jan.kanty.pawelski@gmail.com',
                    website: 'pawelski.io'
                },
                content: 'I made it! My awesome angular comment system. What do you think?',
                loved: false
            },
            {
                id: 2,
                author: {
                    name: 'Tomasz Jakut',
                    email: 'comandeer@comandeer.pl',
                    website: 'comandeer.pl'
                },
                content: 'Nice looking. Good job dude ;)',
                loved: true
            },
            {
                id: 3,
                author: {
                    name: 'Jan-Kanty Pawelski',
                    email: 'jan.kanty.pawelski@gmail.com',
                    website: 'pawelski.io'
                },
                content: '<span class="reply">@Tomasz Jakut</span> Thanks man. I tried hard.',
                loved: false
            },
            {
                id: 4,
                author: {
                    name: 'Grzegorz Bąk',
                    email: 'szary.elf@gmail.com',
                    website: 'gregbak.com'
                },
                content: 'Third! Amazing system man! By the way check my new website: <a href="//gregbak.com">http://gregbak.com</a>.',
                loved: false
            }
        ];
        $scope.newComment = {};
        markdown = function (string) {
            string = string.replace(/(@.+)@/g, '<span class="reply">$1</span>');
            string = string.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
            string = string.replace(/__(.+)__/g, '<strong>$1</strong>');
            string = string.replace(/\*(.+)\*/g, '<em>$1</em>');
            string = string.replace(/_(.+)_/g, '<em>$1</em>');
            string = string.replace(/``(.+)``/g, '<code>$1</code>');
            string = string.replace(/`(.+)`/g, '<code>$1</code>');
            return string;
        };
        $scope.parseContent = function (content) {
            return $sce.trustAsHtml(content);
        };
        $scope.isAuthor = function (email) {
            return email === postAuthorEmail;
        };

        $scope.loveComment = function (commentId) {
            var comment, i, len, ref, results;
            ref = $scope.comments;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                comment = ref[i];
                if (comment.id === commentId) {
                    results.push(comment.loved = !comment.loved);
                } else {
                    results.push(void 0);
                }
            }
            window.CP.exitedLoop(1);
            return results;
        };
        $scope.addReply = function (author) {
            if ($scope.newComment.content === void 0) {
                $scope.newComment.content = '';
            }
            if ($scope.newComment.content.search('@' + author + '@') === -1) {
                if ($scope.newComment.content[0] === '@') {
                    $scope.newComment.content = ', ' + $scope.newComment.content;
                } else {
                    $scope.newComment.content = ' ' + $scope.newComment.content;
                }
                return $scope.newComment.content = '@' + author + '@' + $scope.newComment.content;
            }
        };
        $scope.addNewComment = function () {
            $scope.newComment.id = $scope.comments.length + 1;
            $scope.newComment.content = markdown($scope.newComment.content);
            $scope.newComment.loved = false;
            $scope.comments.push($scope.newComment);
            return $scope.newComment = {};
        };
    });

